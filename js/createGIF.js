$(document).ready(function() {
    var canvas;
    var context;

    var encoder = new GIFEncoder();
    encoder.setRepeat(1); // repeat once
    encoder.setDelay(3000); // every 3000 milliseconds new frame
    encoder.start();

    $("#addFrame").click(function() {
        canvas = document.getElementById('scene');
        context = canvas.getContext('2d');

        encoder.addFrame(context);
    });

    $("#gif").click(function() {
        encoder.finish();
        encoder.download("scene.gif");
    });
});
