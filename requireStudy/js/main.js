require.config({
	baseUrl: 'js/libs',　　　
	paths: {
		'jquery': 'jquery.min',
		'jqueryB': 'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js?rev=1',
		'vconsole': 'vconsole.min',
		'layer': 'layer',
		'cs': '../cs'
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
    }
});

require (['require', 'jqueryB','cs'],function(re,jq, cd){
	console.log(cd.foo(' r m'));
});