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
        console.log("name - " + href);
        event.preventDefault();

        $(href).velocity("scroll", { offset: -(8), complete: function() {
            $(this).attr("id", "");
            window.location.hash = href.substr(0); // should these be 0 or 1?
            $(this).attr("id", href.substr(0));

            console.log("velocity scroll to " + href + " complete.");
        }});
    });

    var section,
        sections = {},
        $contentPanes = $("#main-content > li[id]"), // #documentation is a <ul>
        $oldBest;

    $contentPanes.each(function(){
        var $this = $(this),
            // words = $this.find(".dataHeaderTitle").text().split(":");
            $h1Text = $this.find("h1").text();
        
        console.log("sections");
        console.log(sections);


        // sections[words[0]] = sections[words[0]] || [];
        // sections[words[0]].push([ $this.attr("id"), words[1] ]);
        sections[$h1Text] = sections[$h1Text] || [];
        sections[$h1Text].push([ $this.attr("id"), $h1Text ]);

        console.log("sections");
        console.log(sections);

    });

    for (var i in sections) {
        section = sections[i];
        var $section = $("<ul></ul>").appendTo($glossary.append("<b>" + i + "</b>"));

        for (var j = 0; j < section.length; j++) {
            $section.append("<li><a href=\"#" + section[j][0] + "\">" + section[j][0] + "</a></li>");
        }

        console.log(section);
    }

    $(window).on("scroll", function() {
        console.log("window on scroll invoked.");
        
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