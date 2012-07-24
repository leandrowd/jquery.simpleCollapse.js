/*
 * jQuery.simpleCollapse
 *
 * author: Leandro Lemos
 * e-mail: leandrowd+simpleCollapse@gmail.com
 *
 * Basic markup
 * <div id="accordion">
 *   <a data-collapse="toogle" data-parent="#accordion" href="#nav1">Content 1</a>
 *   <div class="collapse" id="nav1">
 *     content 1
 *   </div>
 *   <a data-collapse="toogle" data-parent="#accordion" href="#nav2">Content 2</a>
 *   <div class="collapse" id="nav2">
 *     content 2
 *   </div>
 *   <a data-collapse="toogle" data-parent="#accordion" href="#nav3">Content 3</a>
 *   <div class="collapse" id="nav3">
 *     content 3
 *   </div>
 * </div>
 *
 */
;
$(function(){
  $.fn.collapse = function(options){
    var defaults = $.extend({
          parent: this.attr("data-parent"),
          collapsible: ".collapse"

        }, options || {}),

        container = $(defaults.parent),
        collapsible = container.find(defaults.collapsible),
        path = document.location.pathname,
        currentLink = $.grep(collapsible.find("a"), function(item){
          return ($(item).attr("href").indexOf(path) > -1);
        });


    $.fn.hideOthers = function(){
      collapsible.not(this).slideUp('normal');
      return this;
    };

    $.fn.showThis = function(){
      this.slideDown('normal');
      return this;
    };

    //show only selected block
    if(currentLink){
      var currentCollapser = $(currentLink).closest(defaults.collapsible);
      currentCollapser.hideOthers().showThis();
    }

    this.bind("click", function(e){
      var target = $(this).attr("href");
      $(target).hideOthers().showThis();
      e.preventDefault();
    })
  }

  $("[data-collapse]").collapse();
});