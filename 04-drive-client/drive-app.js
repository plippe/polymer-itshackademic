Polymer({
  uploadList: [],
  uploadedList: [],
  autoUpload: false,

  tapSelect: function (e) {
    this.$.files.click();
  },

  handleDragOver: function (e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  },

  handleFilePick: function (e) {
    e.stopPropagation();
    e.preventDefault();
    this.selectFiles(e.target.files);
  },

  handleFileSelect: function (e) {
    e.stopPropagation();
    e.preventDefault();
    this.selectFiles(e.dataTransfer.files);
  },

  clearUploadList: function () {
      this.uploadedList = [];
      this.uploadList = [];
  },

  uploadFiles: function (files) {
    var uploadedList = this.uploadedList;
    this.$.status.innerHTML = 'Uploading...';

    var f;
    for(var i=0; f = files[i]; i++) {
      var uploader = new MediaUploader({
        file: f,
        token: this.accessToken,
        onComplete: function (data) {
          uploadedList.push(JSON.parse(data));
          this.$.status.innerHTML = 'Upload successful';
          this.uploadList = [];
        }.bind(this)
      });
      uploader.upload();
    }
  },

  manualUpload: function () {
    this.uploadFiles(this.queue);
  },

  selectFiles: function (files) {
    this.queue = files;
    this.$.status.textContent = 'Files selected';

    var f;
    for(var i=0; f = files[i]; i++) {
      this.uploadList.push(f);
    }

    if(this.autoUpload) {
      this.uploadFiles(files);
    }
  },
  signedIn: function (e) {
    this.accessToken = e.detail.result.access_token;
    this.$.loggedin.style.display = 'block';
  },

  signedOut: function (e) {
    this.$.loggedin.style.display = 'none';
  }
});