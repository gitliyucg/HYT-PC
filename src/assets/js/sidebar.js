$(function(){
	//响应式导航
	if(window.screen.width >=768)
	{
    $("#Sidebar").css("width") == "180px";
		$("body").on('click', '#appside', function()
		{
			$("#Sidebar .sidebarFirst ul").hide();
			if($("#Sidebar").css("width") == "45px")
			{
				$("#Sidebar").animate({width:"180px"},500,"linear");
			}else
			{
				$("#Sidebar").animate({width:"45px"},500,"linear");
			}

		});
	}else{
    $("#Sidebar").css("width") == "45px";
    $("body").on('click', '#appside', function()
		{
			if($("#Sidebar").css("left") == "0px")
			{
				$("#Sidebar").animate({left:"-45%"},500,"linear");
			}else
			{
				$("#Sidebar").animate({left:"0px"},500,"linear");
			}

		});
	}

	//顶部菜单
	$("#usermore").click(function(){
		$(this).mouseleave(function(){
			setTimeout(function() {
				$("#usermore").removeClass("on");
			}, 2000);

		});
		if($(this).hasClass("on"))
		{
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
	});
});
