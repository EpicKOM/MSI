// layout.js
NProgress.configure({ showSpinner: false });
NProgress.start();

window.addEventListener('load', function() {
    NProgress.done();
});
