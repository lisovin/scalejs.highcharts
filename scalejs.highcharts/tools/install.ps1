param($installPath, $toolsPath, $package, $project)

$project | 
	Add-Paths "{
		'jQuery'			: 'Scripts/jQuery-1.9.0',
		'scalejs.highcharts' : 'Scripts/scalejs.highcharts-$($package.Version)',
		'highcharts'			: 'Scripts/highcharts.src',
		'knockout'			: 'Scripts/knockout-2.2.1',
		'knockout.mapping'	: 'Scripts/knockout.mapping-latest'
	}" |
	Add-Shims "{
		'jQuery'			: {
			exports : 'jQuery'
		},
		'highcharts'			: {
			deps	: ['jQuery'],
			exports : 'Highcharts'
		}
	}" |
	Add-ScalejsExtension 'scalejs.highcharts'
    
