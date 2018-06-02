module.exports = {
    img(arr) {
        let newimages = [];
        for (var i = 0; i < arr.length; i++) {
            newimages[i] = new Image();
            newimages[i].src = arr[i];
        }
    }
}
