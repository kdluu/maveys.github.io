$(document).ready(function() {
    var canvas;
    var context;
    var text_1;
    var text_2;
    var text_3;
    var length;

    var type_text = function (id, text, index, interval) {
        if (index < text.length) {
            context.fillText(text[index++], 125, 510
            );
            setTimeout(function() {type_text(id, text, index, interval); }, interval);
        }
    }

    var encoder = new GIFEncoder();
    encoder.setRepeat(1); // repeat once
    encoder.setDelay(100); // every 1500 milliseconds new frame
    encoder.start();

    $("#addFrame").click(function() {
        canvas = document.getElementById('scene');
        context = canvas.getContext('2d');

        var text_1 = $("#story_text_1").val();
        var text_2 = $("#story_text_2").val();
        var text_3 = $("#story_text_3").val();
        context.save()
        context.font = "25px motoyalmaruw3_mono";
        context.fillStyle = 'white';
        context.shadowColor = 'black';
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 2;
        context.scale(1,1);
        add_idol_name();
        for (var i = 0; i < text_1.length; i++) {
            context.fillText(text_1[i], 125 + (i * 15)  , 510);
            encoder.addFrame(context);
        }
        for (var i = 0; i < text_2.length; i++) {
            context.fillText(text_2[i], 125 + (i * 15), 545);
            encoder.addFrame(context);
        }
        for (var i = 0; i < text_3.length; i++) {
            context.fillText(text_3[i], 125 + (i * 15), 580)
            encoder.addFrame(context);
        }
        for (var i = 0; i < 10; i++) {
            encoder.addFrame(context);
        }
        context.restore();
    });

    $("#gif").click(function() {
        encoder.finish();
        encoder.download("scene.gif");
    });

    function add_idol_name()
    {
        var image = new Image();
        var context = document.getElementById('scene').getContext('2d');
        image.src = "https://maveys.github.io/assets/sprites/idol.png";

            image.onload = function() {
            context.drawImage(image, 100, 640 - 225);
            context.save();

            var text = $("#speaker").val();
            context.font = "25px motoyalmaruw3_mono";
            context.fillStyle = 'white';
            context.shadowColor = 'black';
            context.shadowOffsetX = 1;
            context.shadowOffsetY = 2;
            context.scale(1,1);
            context.fillText(text, 165, 450);
            context.restore();
        }
    }

});
