$(document).ready(function() 
{
	var table = $('#testTable').DataTable( 
	{

	  select: 
	  {
			style: 'os',
		items: 'cell'
	  }
	
	});
	console.log(table);
});