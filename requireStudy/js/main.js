require.config({
	baseUrl: 'js/lib',　　　
	paths: {
		'jquery': 'jquery.min',
		'jqueryB': 'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js',
		'vconsole': 'vconsole.min',
		'layer': 'layer'
	},
	'shim': {
        'jquery': {
            'exports': 'jquery'
        },
        'layer': {
            'exports': 'layer'
        },
        'vconsole': {
            'exports': 'vconsole'
        },
    },
});