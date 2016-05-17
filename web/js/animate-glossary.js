// Referenced code from VelocityJS' demonstrations

/*************
 Global
 *************/

/* Force all non-hash links to open in a new tab. */
$("#main a").filter(function() { return !/^#/.test($(this).attr("href")); }).attr("target", "_blank")


/* Glossary section creation and scroll highlighting. */
if (!("ontouchstart" in window)) {
    var $glossary = $("#glossary");
    //var navHeight = $("#nav").outerHeight();

    if ($glossary.height() > $('body').height()) {
        $glossary.css({ overflowY: 'scroll', height: '90%', width: '120px' })
    }

    $glossary.on("click", "a", function(event) {
        // Get the anchor's href
        var href = $(this).attr("href");
        
        event.preventDefault();

        $(href).velocity("scroll", { offset: -(8), complete: function() {
            
            
            $(this).attr("id", "");
            
            window.location.hash = href.substr(1); // should these be 0 or 1?
            $(this).attr("id", href.substr(1));

            console.log("Velocity scroll complete.");
        }});
    });

    var section,
        sections = {},
        // $contentPanes = $("#main-content > li[id]"), // #contentPanes is a <ul>
        $contentPanes = $("#main-content > li[id]"), // #contentPanes is a <ul>
        $oldBest;

    $contentPanes.each(function(){
        var $this = $(this),
            id = $this.attr("id"),
            $h1Text = $this.find("h1").text();
        
        sections[$h1Text] = sections[$h1Text] || [];

        var arr = [];
        arr["id"] = $this.attr("id");
        arr["h1Text"] = $h1Text;

        sections[$h1Text].push(arr);
    });

    for (var i in sections) {
        section = sections[i][0];
        var $section = $("<li></li>").appendTo($glossary);
        $section.append("<a href=\"#" + section['id'] + "\">" + section['h1Text'] + "</a>");

    }

    $(window).on("scroll", function() {

        $contentPanes.each(function(){
            var $this = $(this),
                offset = $this.offset();

            if (offset.top >= window.scrollY) {
                if ($oldBest && $oldBest.length) {
                    $oldBest.css({ background: "", borderBottom: "" });
                }

                $oldBest = $glossary.find("a[href=#" + $this.attr("id") + "]").css({ background: "rgba(76, 185, 255, 0.175)", borderBottom: "1px solid rgba(76, 185, 255, 0.175)" });

                return false;
            }
        });
    });
}