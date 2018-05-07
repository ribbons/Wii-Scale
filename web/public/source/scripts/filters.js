/*
 * This file is part of Wii-Scale
 * Copyright © 2018 Matt Robinson
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

(function() {
	'use strict';

	angular.module('app.filters', []).

		filter('formatWeight', ['$sce', function($sce) {
			return function(input, units) {
				console.log(units);
				
				input = parseFloat(input);
				units = units || 'kgs';

				var LBS_PER_KG = 2.2046;
				var LBS_PER_STONE = 14;

				var values;

				switch(units)
				{
					case 'lbs':
						values = [{
							value: (input * LBS_PER_KG).toFixed(1),
							unit: 'lb'
						}];
						break;

					case 'stones':
						var pounds = input * LBS_PER_KG;

						values = [
							{
								value: Math.floor(pounds / LBS_PER_STONE),
								unit: 'st'
							},
							{
								value: (pounds % LBS_PER_STONE).toFixed(1),
								unit: 'lb'
							}
						];
						break;

					default:
						values = [{
							value: input.toFixed(1),
							unit: 'kg'
						}];
				}

				var html = '';

				values.forEach(function(item) {
					html += '<span class="value">' + item.value + '</span> ' +
				            '<span class="unit">' + item.unit + '</span> ';
				});

				return $sce.trustAsHtml(html);
			};
		}]);
})();
