/** Partner Carousel **/
$(window).load(function () {
    addToCart();
    // hold shop-cart dropdown
    $('.wrap-items').click(function (e) {
        e.stopPropagation();
    });
    // remove cart items
    $('.bi-close').click(function () {
        $(this).each(function () {
            if (confirm("Do you want delete this product")) {
                $(this).parent().remove();
            }
            
        });
    });

    // nivo silder
    if ($('#slider').length > 0 ) {
        $('#slider').nivoSlider({
            controlNav: false,
            effect:'fade'
        });
    };
	if ($('.bi-carousel').length > 0) {
	$('.bi-carousel').carouFredSel({
		auto: true,
		prev: '.prev1',
		next: '.next1',
		responsive: true,
		width: '100%',
		height: 'auto',
		scroll: 1,
		items: {
			visible: {
				min: 1,
				max: 5
			}
		},
		swipe:{
			onMouse: true,
			onTouch:true
		}
	});
	};
	if ($('.wrap-slide-content')) {
	$('.wrap-slide-content').carouFredSel({
		auto: true,
		responsive: true,
		scroll: 1,
		width:'100%',
		height: 530,
		pagination: "#slide-page-number",
		items: {
			visible: {
				max: 1
			}
		},
		
		swipe:{
			onMouse: true,
			onTouch:true
		}
	});
	};
    // print bill
$("#print-bill").click(function(){
	    $(".shop-bill").printThis();
});

    // remove items in shop cart dropdown
$("table.wrap-items").on("click", ".remove-cart-item", function (event) {
	    $(this).closest("tr").remove();
	    var $id = $(this).parent().parent().data("prodcutid");
	    var $price = parseInt($(this).parent().parent().find('.item-cart-price').text());
	    var $amout = parseInt($(this).parent().parent().find('.item-cart-amount ').text());
	    var $totalItems = $price * $amout;
	    totalCartItems(-$totalItems);
	    $('.add-card').each(function () {
	        if ($(this).data('prodcutid') == $id) {
	            $(this).find('i').removeClass('fa fa-check-circle-o');
	        }
	    });
	});
	
});

function checkProductCart(id) {
    var tt = true;
    $("table.wrap-items").find("tr").each(function () {
        if (id == $(this).data("prodcutid")) {
            var amout = parseInt($(this).find('span.item-cart-amount').text());
            var price = parseInt($(this).find('span.item-cart-price').text());
            amout++;
            //price = amout * price;
            //console.log(amout);
            $(this).find('span.item-cart-amount').text(amout);
           // $(this).find('span.item-cart-price').text(price);
            totalCartItems(price);
            tt= false
        }
    });
    return tt;
}

function totalCartItems(aPrice) {
    var totalPrice = parseInt($(".total-cart-price").text());
    totalPrice += parseInt(aPrice);
    $(".total-cart-price").text(totalPrice);
}


function addToCart() {
    $('.add-card').click(function () {
        if ($(this).data("check") == 1) {
            var $prodcutId = $(this).data("prodcutid");
            if (checkProductCart($prodcutId)) {
                
                var $wrap = $(".detail-product");
                var $img = $('.wrap-product').find('img').attr("src");
                //console.log($img);
                var $name = $wrap.find('h4').data('itemname');
                var $price = $wrap.find('.sale').data('price');
                totalCartItems($price)
                var $info = "<tr data-prodcutid=" + $prodcutId + "><td><img src=" + $img + " width='54px' height='54px' /></td><td class='item-info'><p>" + $name + "</p><p class='red'><span class='item-cart-amount '>1</span> x $ <span class='item-cart-price'>" + $price + "</span></p></td><td><a class='remove-cart-item'>&times;</a></td> </tr>"
                $('.wrap-items tbody').append($info);
                $(this).find('i').addClass('fa fa-check-circle-o');
            }
        } else {
        var $prodcutId = $(this).data("prodcutid");
        if (checkProductCart($prodcutId)) {
            var $prodcutwrap = $(this).parent();
            //console.log($prodcutwrap);
            var $img = $prodcutwrap.find('img').attr("src");
            var $name = $prodcutwrap.find('h4').data('itemname');
            var $price = $prodcutwrap.find('.sale').data('price');
            totalCartItems($price)
            //console.log($name + $price);
            var $info = "<tr data-prodcutid=" + $prodcutId + "><td><img src=" + $img + " width='54px' height='54px' /></td><td class='item-info'><p>" + $name + "</p><p class='red'><span class='item-cart-amount '>1</span> x $ <span class='item-cart-price'>" + $price + "</span></p></td><td><a class='remove-cart-item'>&times;</a></td> </tr>"
            $('.wrap-items tbody').append($info);
            $(this).find('i').addClass('fa fa-check-circle-o');
        }
        }
            
    });
}
    

//validate form

    
	function Checkform1()
	{
		var s = "";	FirstName = document.getElementById("txtFirstName");
		var s1 = ""; LastName = document.getElementById("txtLastName");
		var s2 = ""; email = document.getElementById("txtEmail");
		var s3 = ""; password = document.getElementById("txtpassword");
		var s4 = ""; password1 = document.getElementById("txtpassword1");
		s = FirstName.value;
		s1 = LastName.value;
		s2 = email.value;
		s3 = password.value;
		s4 = password1.value;
		if (s == "")
		{
			alert("Bạn chưa nhập Tên");
			return false;
		}
		if (s1 == "")
		{
			alert("Bạn chưa nhập Họ");
			return false;
		}
		if (s2 == "")
		{
			alert("Bạn chưa nhập email");
			return false;
		}if (s3 == "")
		{
			alert("Bạn chưa nhập password");
			return false;
		}if (s4 == "")
		{
			alert("Bạn chưa nhập lại password ");
			return false;
		}
		if (s3 != s4)
		{
			alert("Bạn nhập lại Password sai");
			return false;
		}
		else
		{
			var at = s2.indexOf("@");
			var dot = s2.indexOf(".");
			var space = s2.indexOf(" ");
			if ((at < 0) || (dot < 0)|| (space > 0))
			{
				alert("Địa chỉ email không hợp lệ!");
				return false;
			}
			else
			{ 
				alert("Bạn đã đăng nhập thành công");
				return false;
			}
		}
	}

		function Checkform()
	{
		var email;
		var password;
		var s = "";	email = document.getElementById("txtEmail");
		var s1 = "";	password = document.getElementById("txtpassword");
		s = email.value;
		s1 = password.value;
		if (s == "")
		{
			alert("Bạn chưa nhập địa chỉ email!");
			return false;
		}
		if (s1 == "")
		{
			alert("Bạn chưa nhập password");
			return false;
		}
		else
		{
			var at = s.indexOf("@");
			var dot = s.indexOf(".");
			var space = s.indexOf(" ");
			if ((at < 0) || (dot < 0)|| (space > 0))
			{
				alert("Địa chỉ email không hợp lệ!");
				return false;
			}
			else
			{ 
				alert("Bạn đã đăng nhập thành công");
				return false;
			}
		}
	}

	$(function () {
	    $('.dropdown.keep-open').on({
	        "shown.bs.dropdown": function () {
	            $(this).data('closable', false);
	        },
	        "click": function () {
	            $(this).data('closable', true);
	        },
	        "hide.bs.dropdown": function () {
	            return $(this).data('closable');
	        }
	    });
	});

