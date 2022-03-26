const CountryBuble = new function () {
	const CONFIG = {
		maxBubbleRadius: 20,
		kincaidDomainPadding: 0.1,
		xAxisLabel: '파견인원수',
		yAxisLabel: '평균임금',
		keyCircleLabel: 'Job Type',
		noneSelectedOpacity: 0.3,
		selectedOpacity: 1,
		unselectedOpacity: 0.07,
		row_cells: 4,
		headingText: '',
	};

	let jobTypes,
		selectedLocation,
		points;
	const margin = {
		top: 10, right: -20, bottom: 30, left: 120,
	};
	let svg,
		xAxis,
		yAxis,
		keyCircle,
		xScale,
		yScale,
		circleScale,
		elPopup,
		width,
		height;
	let popupTemplate,
		popupConnectors,
		helpers;
	let chartContainer,
		chart;
	let gia;
	let linePosition = 0;

	// this.reRender = function () {
	// 	$('#country-buble').html('');
	// 	CountryBuble.init();
	// };

	this.init = (country) => {
		const h = window.innerHeight - 120;
		width = $('#bubleChartDiv').width() - margin.left - margin.right,
			height = (60 * h) / 100 - margin.top;

		gia = d3.select('#country-buble');

		chartContainer = gia.append('div');

		chart = chartContainer.append('div')
			.attr('id', 'country-buble-chart');

		svg = chart.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append("svg:g")
			.attr("transform", "translate(0,0)scale(.9,.9)");


		// chartContainer
		// 	.style('height', chart.node().offsetHeight + 'px');
		svg = svg.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		const background = svg.append('rect')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', width)
			.attr('height', height)
			.style('fill', '#fff')
			.on('mouseout', (e) => { selectedLocation = null; render(); })
			.on('mousemove', function () { selectByX(d3.mouse(this)[0]); })

		elPopup = chart.append('div')
			.attr('id', 'country-buble-popup');

		const elPresidents = gia.append('div').attr('id', 'country-buble-jobTypes');

		const presidentTemplate = _.template('');
		popupTemplate = _.template("<h3><%= speech.jobtype %></h3><div class='country-buble-popup-date'>Average wage: <%= speech.avgStr %></div><div class='country-buble-popup-date'>Total submission: <%= speech.total_application %></div>");

		const yyyymmdd = d3.time.format('%Y-%m-%d');
		const formatDate = d3.time.format('%-d %B %Y');

		const formatKincaid = d3.format('.1f');

		helpers = {
			addCommas: d3.format(','),
			formatDate,
			formatKincaid,
		};

		xScale = d3.scale.log()
			.range([0, width]);

		yScale = d3.scale.linear()
			.range([height, 0]);

		colors = d3.scale.category10();

		circleScale = d3.scale.sqrt().range([0, CONFIG.maxBubbleRadius]);
		

		keyCircle = scaleKeyCircle()
			.scale(circleScale)
			.tickValues([300, 30000]);

		svg.append('g')
			.attr('class', 'x axis')
			.attr('transform', `translate(0, ${height})`)
			.append('text')
			.attr('transform', `translate(${width / 2}, 0)`)
			.attr('class', 'gia-axisLabel')
			.attr('x', 0)
			.attr('y', 40)
			.style('text-anchor', 'middle')
			.style('fill', '#66666 !important')
			.style('font-size', '16px')
			.style('font-family', 'SCDream3')
			.text(CONFIG.xAxisLabel);

		svg.append('g')
			.attr('class', 'y axis')
			.append('text')
			.attr('class', 'gia-axisLabel')
			.style('fill', '#66666 !important')
			.attr('transform', 'rotate(-90)')
			.attr('y', -100)
			.attr('x', -height / 2)
			.attr('dy', '.75em')
			.style('text-anchor', 'middle')
			.style('font-size', '16px')
			.style('font-family', 'SCDream3')
			.text(CONFIG.yAxisLabel);


		popupConnectors = svg.append('g')
			.attr('id', 'popupConnectors');

		popupConnectors.append('line').attr('class', 'connector1');
		popupConnectors.append('line').attr('class', 'connector2');

		svg.append('g')
			.attr('class', 'speeches');

		d3.json('http://106.254.237.82:5052/country/getJobTypeCorrelation?country=' + country, (json) => {
			jobTypes = json.results;
			jobTypes.forEach((location, i) => {
				location.id = i;
				location.avgStr = location.wage.toLocaleString();
			});

			// Sort by least to most readable
			jobTypes.sort((a, b) => d3.ascending(a.total_application, b.total_application));

			const extentX = d3.extent(jobTypes, d => d.total_application + d.total_application * 0.4);
			const extentY = d3.extent(jobTypes, d => d.wage);

			xScale.domain([0.8, extentX[1]]);
			yScale.domain(extentY);
			xAxis = d3.svg.axis().ticks(2)
			.scale(xScale)
			.orient('bottom')
			.ticks(2, d3.format(',d'));

			yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left');
			circleScale.domain([100, 100]);

			renderAxis();
			render();
			window.onscroll = setChartPosition;
			setChartPosition();
		});
	};

	function renderAxis() {
		svg.select('g.x.axis')
			.call(xAxis);

		svg.select('g.y.axis')
			.call(yAxis);

		svg.select('g.circle.scale')
			.call(keyCircle);
	}


	function renderPoints() {
		const g = svg.select('g.speeches');

		points = g.selectAll('circle.speech')
			.data(jobTypes);
		const colors = d3.scale.category20();
		points.enter()
			.append('circle')
			.attr('class', 'speech')
			.attr('cx', d => xScale(d.total_application))
			.attr('cy', d => yScale(d.wage))
			.attr('r', d => 10)
			.attr('fill', (d, i) => colors(i % 20))
			.attr('stroke', 'rgba(0,0,0, .05)')
			.on('mouseover', (d) => {
				selectedLocation = d; render();
			})

		points
			.classed('selected', d => selectedLocation && d === selectedLocation)
			.attr('fill-opacity', (d) => {
				if (selectedLocation) {
					return d === selectedLocation ? CONFIG.selectedOpacity : CONFIG.unselectedOpacity;
				}
				return CONFIG.noneSelectedOpacity;
			});

		const texts = g.selectAll('text')
			.data(jobTypes);

		texts.enter()
			.append('text')
			.attr('class', 'text')
			.text((d) => {
				// if (CONFIG.displayLocations.indexOf(d.country) >= 0) return d.country;
				return '';
			})
			.call(positionText)
			.attr('font-size', '8px')
			.attr('fill', '#2d2d2d');
		texts
			.classed('selected', d => selectedLocation && d === selectedLocation)
			.attr('fill-opacity', (d) => {
				if (selectedLocation) {
					return d.jobtype === selectedLocation.jobtype ? 1 : 0.2;
				}
				return 0.7;
			});

		function positionText(text) {
			text.attr('dx', d => xScale(d.total_application))
				.attr('dy', d => yScale(d.wage));
		}
	}

	function renderPopup() {
		if (selectedLocation) {
			const g = svg.select('g.speeches');
			const selectedPoint = g.select('.selected');
			if (selectedPoint == null) return;
			const top = margin.top + 40;
			// var top = Math.round(selectedPoint.attr('cy'));

			const cx = Math.round(selectedPoint.attr('cx'));
			const cy = Math.round(selectedPoint.attr('cy'));
			const flip = cx < width / 2;
			let left = cx;

			popupConnectors
				.style('display', 'block');

			popupConnectors
				.select('.connector1')
				.attr('x1', cx)
				.attr('x2', cx)
				.attr('y1', cy)
				.attr('y2', top + 35);

			popupConnectors
				.select('.connector2')
				.attr('x1', cx)
				.attr('x2', () => cx + (flip ? 40 : -40))
				.attr('y1', top + 35)
				.attr('y2', top + 35);

			const leftPadding = Math.round(circleScale(selectedLocation.TotalJobs)) + 26;

			if (flip) {
				left += leftPadding;
			} else {
				left -= parseInt(elPopup.style('width'));
				left -= leftPadding - 40;
			}
			left += margin.left;

			elPopup
				.html(popupTemplate({ speech: selectedLocation, helpers }))
				.style('top', `${top}px`)
				.style('left', `${left}px`)
				.style('display', 'block');
		} else {
			elPopup.style('display', 'none');
			popupConnectors.style('display', 'none');
		}
	}
	function render() {
		d3.selectAll('.country-buble-annotation').style('display', () => (selectedLocation ? 'none' : 'block'));
		renderPoints();
		renderPopup();

		// svg.append('line')
		// 	.style('stroke', '#ddd')
		// 	.style('stroke-dasharray', '4,4')
		// 	.attr('x1', 0)
		// 	.attr('y1', linePosition)
		// 	.attr('x2', width)
		// 	.attr('y2', linePosition);

	}

	function selectByX(x) {
	}


	function scaleKeyCircle() {
		let scale,
			orient = 'left',
			tickPadding = 3,
			tickExtend = 5,
			tickArguments_ = [5],
			tickValues = null,
			tickFormat_;

		function key(g) {
			g.each(function () {
				const g = d3.select(this);

				// Ticks, or domain values for ordinal scales.
				let ticks = tickValues == null ? (scale.ticks ? scale.ticks(...tickArguments_) : scale.domain()) : tickValues,
					tickFormat = tickFormat_ == null ? (scale.tickFormat ? scale.tickFormat(...tickArguments_) : String) : tickFormat_;

				ticks = ticks.slice().reverse();

				ticks.forEach((tick) => {
					const gg = g.append('g')
						.attr('class', 'circleKey')
						.attr('transform', `translate(0,${-scale(tick)})`);

					gg.append('circle')
						.attr('cx', 0)
						.attr('cy', 0)
						.attr('r', scale(tick));

					let x1 = scale(tick),
						x2 = tickExtend + scale(ticks[0]),
						tx = x2 + tickPadding,
						textAnchor = 'start';

					if (orient === 'left') {
						x1 = -x1;
						x2 = -x2;
						tx = -tx;
						textAnchor = 'end';
					}

					gg.append('line')
						.attr('x1', x1)
						.attr('x2', x2)
						.attr('y1', 0)
						.attr('y2', 0)
						.attr('stroke', '#000')
						.text(tick);

					gg.append('text')
						.attr('transform', `translate(${tx}, 0)`)
						.attr('dy', '.35em')
						.style('text-anchor', textAnchor)
						.text(tickFormat(tick));
				});
			});
		}

		key.scale = function (value) {
			if (!arguments.length) return scale;
			scale = value;
			return key;
		};

		key.orient = function (value) {
			if (!arguments.length) return orient;
			orient = value;
			return key;
		};

		key.ticks = function () {
			if (!arguments.length) return tickArguments_;
			tickArguments_ = arguments;
			return key;
		};

		key.tickFormat = function (x) {
			if (!arguments.length) return tickFormat_;
			tickFormat_ = x;
			return key;
		};

		key.tickValues = function (x) {
			if (!arguments.length) return tickValues;
			tickValues = x;
			return key;
		};

		key.tickPadding = function (x) {
			if (!arguments.length) return tickPadding;
			tickPadding = +x;
			return key;
		};

		key.tickExtend = function (x) {
			if (!arguments.length) return tickExtend;
			tickExtend = +x;
			return key;
		};

		key.width = function (value) {
			if (!arguments.length) return width;
			width = value;
			return key;
		};

		key.height = function (value) {
			if (!arguments.length) return height;
			height = value;
			return key;
		};

		return key;
	}
}();
