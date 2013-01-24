param($installPath, $toolsPath, $package, $project)

$project |
	Remove-Paths 'scalejs.highcharts, highcharts' |
	Remove-Shims 'highcharts' |
	Remove-ScalejsExtension 'scalejs.highcharts' |
	Out-Null
