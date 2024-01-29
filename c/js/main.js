(function($){

    var mobileMenuIcon = $('.mobile-menu-icon');

    
    if (mobileMenuIcon.length) {
        mobileMenuIcon.on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('open');
            $('.kt-main-nav').slideToggle();
        });

    }

    // totop scroller

    var totop = $('#toTop'),
        win = $(window);

    // scrollTop init

    win.on('scroll', function () {

        if (win.scrollTop() > 150) {
            totop.fadeIn();
        } else {
            totop.fadeOut();
        }
        
    });

    totop.on('click', function () {

        $("html,body").animate({
            scrollTop: 0
        }, 500)

    });

    // Language Switcher  active

    $(".lang-switcher").on("click", function(e){
        e.preventDefault();
        $(".lang-list").toggleClass("lang-list-open");
    });

    $(".lang-list li").each(function(){
        $(this).on("click", function(){
            var logoSrc = $(this).children(".flag").children("img").attr("src");
            var langText =  $(this).children(".lang-text").text();
            $(".lang-switcher > .flag img").attr("src", logoSrc);
            $(".lang-switcher > .lang span").text(langText);
        });
    });

    win.on("click",function(e){

        if($(".lang-switcher").has(e.target).length === 0){
            $(".lang-list").removeClass("lang-list-open");
        }

    })

    // Table Info

    $(".info").on("click", function(){

        if($("td .info-text").hasClass("active")){

            if($('.info-text', this).hasClass("active")){
                
            }else{
                $("td .info-text").removeClass("active")
            }
           
        }

        $(".info-text", this).toggleClass("active");

    })

    new WOW().init();

 

})(jQuery);


(function(){

    // Sticky Nav

    const headerContainer = document.querySelector(".kt-header");
    window.onscroll = ()=>{
        this.scrollY > 30 ? headerContainer.classList.add("sticky") : headerContainer.classList.remove("sticky");
    }

})()
