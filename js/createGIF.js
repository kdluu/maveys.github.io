$(document).ready(function() {
    var canvas;
    var image;

    var encoder = new GIFEncoder();
    encoder.setRepeat(1); // repeat once
    encoder.setDelay(3000); // every 3000 milliseconds new frame
    encoder.start();

    $("#addFrame").click(function() {
        var img = new Image();
        img.crossOrigin = "Anonymous";
        canvas = document.getElementById('scene');
        var dataURL = canvas.toDataURL('image/png');

        img.src = dataURL;
        encoder.addFrame(img, true);
    });

    $("#gif").click(function() {
        encoder.finish();
        encoder.download("scene.gif");
    });
});
