/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme, darken, brighten, hexToRgb } from '../../../services';
import { mathWithUnits, euiCanAnimate } from '../../../global_styling';
import { euiCustomControl } from '../../form/form.styles';

import {
  euiRangeThumbStyle,
  euiRangeVariables,
} from '../../form/range/range.styles';

export const euiColorStopsStyles = (
  euiThemeContext: UseEuiTheme,
  isDisabled: boolean | undefined
) => {
  const range = euiRangeVariables(euiThemeContext);
  const { euiTheme, colorMode } = euiThemeContext;
  const isDarkMode = colorMode === 'DARK';
  const stripeColor = isDarkMode
    ? brighten(range.trackColor, 0.5)
    : darken(range.trackColor, 0.5);

  const stripesBackground = `repeating-linear-gradient(
    -45deg,
    ${range.trackColor},
    ${range.trackColor} 25%,
    ${stripeColor} 25%,
    ${stripeColor} 50%,
    ${range.trackColor} 50%
  )`;

  return {
    // Base
    euiColorStops: css`
      ${!isDisabled &&
      `
        &:focus {
          outline: none;

          .euiColorStops__track::after {
            box-shadow: 0 0 0 1px rgba(${hexToRgb(
              euiTheme.colors.emptyShade
            )}, 0.8),
              0 0 0 3px ${range.focusColor};
          }
        }

        &:focus:not(:focus-visible) {
          .euiColorStops__track::after {
            box-shadow: none;
          }
        }
      `}
    `,
    euiColorStops__track: css`
      &:after {
        background: ${stripesBackground};
        background-size: ${euiTheme.size.xs} ${euiTheme.size.xs}; // Percentage stops and background-size are both needed for Safari to render the gradient at fullWidth correctly
        transition-property: box-shadow;

        // this transition-delay prevents Safari of adding the focus ring (box-shadow) every time we click the EuiColorStops
        // the focus still appear when we drag a color stop in Safari
        transition-delay: ${euiTheme.animation.extraFast};
      }
    `,
    euiColorStops__addTarget: css`
      ${euiCustomControl(euiThemeContext, { type: 'round' })};
      ${euiRangeThumbStyle(euiThemeContext)};
      position: absolute;
      inset-block-start: 0;
      block-size: ${range.thumbHeight};
      inline-size: ${range.thumbHeight};
      background-color: ${euiTheme.colors.lightestShade};
      pointer-events: none;
      opacity: 0;
      border: 1px solid ${euiTheme.colors.darkShade};
      box-shadow: none;
      z-index: ${range.thumbZIndex};
      ${euiCanAnimate} {
        transition: opacity ${euiTheme.animation.fast} ease-in;
      }
    `,
    isDragging: css`
      &:not(.euiColorStops-isDisabled):not(.euiColorStops-isReadOnly) {
        cursor: grabbing;
      }
    `,
    isHoverDisabled: css``,
    isDisabled: css``,
    isReadOnly: css``,
  };
};

export const euiColorStopsAddContainerStyles = (
  euiThemeContext: UseEuiTheme,
  isDisabled: boolean | undefined
) => {
  const range = euiRangeVariables(euiThemeContext);

  return {
    euiColorStopsAddContainer: css`
      display: block;
      position: absolute;
      inset-inline-start: 0;
      inset-inline-end: 0;
      inset-block-start: 50%;
      block-size: ${range.thumbHeight};
      margin-block-start: ${mathWithUnits(range.thumbHeight, (x) => x * -0.5)};
      z-index: ${range.thumbZIndex};

      ${!isDisabled &&
      `
        &:hover {
          cursor: pointer;

          .euiColorStops__addTarget {
            opacity: 0.7;
          }
        }
      `}
    `,
    isDisabled: css``,
  };
};
