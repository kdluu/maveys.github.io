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
    encoder.setDelay(1500); // every 1500 milliseconds new frame
    encoder.start();

    $("#addFrame").click(function() {
        canvas = document.getElementById('scene');
        context = canvas.getContext('2d');

        text_1 = $("#story_text_1").val();
		text_2 = $("#story_text_2").val();
		text_3 = $("#story_text_3").val();
        length = text_1.length + text_2.length + text_3.legnth;
        
        context.save()
		context.font = "25px motoyalmaruw3_mono";
		context.fillStyle = 'white';
		context.shadowColor = 'black';
		context.shadowOffsetX = 1;
		context.shadowOffsetY = 2;
		context.scale(1,1);
		context.fillText(text_1, 125, 510);
		context.fillText(text_2, 125, 545);
		context.fillText(text_3, 125, 580);
		context.restore();

        encoder.addFrame(context);
    });

    $("#gif").click(function() {
        encoder.finish();
        encoder.download("scene.gif");
    });
});
