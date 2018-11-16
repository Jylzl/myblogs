<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <editor api-key="udm8u7u1w88b8yqqt0czgf3glqzet1mnbt95at9wv8u6bib3" :init='init' v-model='tinymceHtml' :id='tinymceId' @onSelectionChange="handlerFunction"></editor>
    <div v-html="tinymceHtml" id="tinymceId"></div>
    <div>{{tinymceHtml}}</div>
  </el-form>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
// language
import "tinymce/langs/zh_CN";
// A theme is also required
import "tinymce/themes/modern/theme";

// Any plugins you want to use has to be imported
import "tinymce/plugins/advlist";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autosave";
import "tinymce/plugins/charmap";
import "tinymce/plugins/codesample";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/hr";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/media";
import "tinymce/plugins/noneditable";
import "tinymce/plugins/paste";
import "tinymce/plugins/print";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/tabfocus";
import "tinymce/plugins/template";
import "tinymce/plugins/textpattern";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/bbcode";
import "tinymce/plugins/code";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/directionality";
import "tinymce/plugins/fullpage";
import "tinymce/plugins/help";
import "tinymce/plugins/image";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/importcss";
import "tinymce/plugins/legacyoutput";
import "tinymce/plugins/lists";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
import "tinymce/plugins/save";
import "tinymce/plugins/spellchecker";
import "tinymce/plugins/table";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/toc";
import "tinymce/plugins/visualchars";
import Prism from "prismjs";
// var Prism = require("prismjs");
export default {
  name: "tinymce",
  components: { Editor },
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },

      tinymceId: "vue-tinymce-" + Date.now(),
      tinymceHtml: "",
      init: {
        selector: this.tinymceId, // change this value according to your HTML
        // language_url: "/static/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        body_class: "panel-body ",
        object_resizing: false,
        skin_url: "/static/tinymce/skins/lightgray",
        skin: "lightgray",
        theme: "modern",
        height: 300,
        end_container_on_empty_block: true,
        powerpaste_word_import: "clean",
        code_dialog_height: 400,
        code_dialog_width: 800,
        advlist_bullet_styles: "square",
        advlist_number_styles: "default",
        imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
        default_link_target: "_blank",
        link_title: false,
        nonbreaking_force_tab: true,
        plugins: [
          "advlist autosave  autolink  anchor",
          "codesample code colorpicker contextmenu charmap",
          "directionality",
          "emoticons",
          "fullpage fullscreen",
          "help",
          "importcss image imagetools insertdatetime",
          "legacyoutput lists link ",
          "media",
          "noneditable nonbreaking",
          "paste print preview hr  pagebreak",
          "save  searchreplace",
          "textcolor textpattern table tabfocus toc",
          "visualblocks visualchars",
          "wordcount"
        ],
        codesample_languages: [
          { text: "HTML/XML", value: "markup" },
          { text: "JavaScript", value: "javascript" },
          { text: "CSS", value: "css" },
          { text: "PHP", value: "php" },
          { text: "Ruby", value: "ruby" },
          { text: "Python", value: "python" },
          { text: "Java", value: "java" },
          { text: "C", value: "c" },
          { text: "C++", value: "cpp" },
          { text: "C#", value: "csharp" }
        ],
        codesample_dialog_width: "600",
        codesample_dialog_height: "400",
        menubar: {
          default: "file edit insert view format table help"
        },
        toolbar: [
          "save | undo redo | fontselect | fontsizeselect | bold italic underline strikethrough removeformat | forecolor | backcolor | alignleft  aligncenter alignright alignjustify | bullist | numlist | outdent indent | ltr rtl | fullscreen",
          "link image  media  codesample table currentdate visualblocks"
        ],
        content_css: [
          "//fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
          "//www.tiny.cloud/css/codepen.min.css"
        ],
        visualblocks_default_state: true,
        // font_formats:
        //   "Courier New=courier new,courier,monospace; Arial=arial,helvetica,sans-serif; Helvetica Light= helvetica light",
        // fontsize_formats:
        //   "8px 9px 10px 11px 12px 14px 16px 18px 20px 22px 24px 26px 28px 36px 48px 72px",
        fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt",
        font_formats:
          "Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Microsoft YaHei = Microsoft YaHei;黑体=SimHei;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",
        block_formats: "Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3",
        branding: false,
        block_formats:
          "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;Preformatted=pre",
        style_formats: [
          { title: "Bold text", inline: "b" },
          { title: "Red text", inline: "span", styles: { color: "#ff0000" } },
          { title: "Red header", block: "h1", styles: { color: "#ff0000" } },
          { title: "Example 1", inline: "span", classes: "example1" },
          { title: "Example 2", inline: "span", classes: "example2" },
          { title: "Table styles" },
          { title: "Table row 1", selector: "tr", classes: "tablerow1" }
        ],
        image_advtab: true,
        templates: [
          { title: "Test template 1", content: "Test 1" },
          { title: "Test template 2", content: "Test 2" }
        ],
        // 自定义时间按钮
        setup: function(editor) {
          function toTimeHtml(date) {
            return `<time datetime${date.toString()}>${date.toDateString()}</time>`;
          }

          function insertDate() {
            var html = toTimeHtml(new Date());
            editor.insertContent(html);
          }

          function monitorNodeChange() {
            var btn = this;
            editor.on("NodeChange", function(e) {
              btn.disabled(e.element.nodeName.toLowerCase() == "time");
            });
          }

          editor.addButton("currentdate", {
            icon: "insertdatetime",
            //image: 'http://p.yusukekamiyamane.com/icons/search/fugue/icons/calendar-blue.png',
            tooltip: "插入时间",
            onclick: insertDate,
            onpostrender: monitorNodeChange
          });
        },
        // 图片上传
        // without images_upload_url set, Upload tab won't show up
        // images_upload_url: "postAcceptor.php",

        // // we override default upload handler to simulate successful upload
        // images_upload_handler: function(blobInfo, success, failure) {
        //   setTimeout(function() {
        //     // no matter what you upload, we will turn it into TinyMCE logo :)
        //     success("http://moxiecode.cachefly.net/tinymce/v9/images/logo.png");
        //   }, 2000);
        // },

        // init_instance_callback: function(ed) {
        //   // ed.execCommand("mceImage");
        // }

        // enable title field in the Image dialog
        image_title: true,
        // enable automatic uploads of images represented by blob or data URIs
        automatic_uploads: true,
        // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
        // images_upload_url: 'postAcceptor.php',
        // here we add custom filepicker only to Image dialog
        file_picker_types: "image",
        // and here's our custom image picker
        file_picker_callback: function(cb, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");

          // Note: In modern browsers input[type="file"] is functional without
          // even adding it to the DOM, but that might not be the case in some older
          // or quirky browsers like IE, so you might want to add it to the DOM
          // just in case, and visually hide it. And do not forget do remove it
          // once you do not need it anymore.

          input.onchange = function() {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function() {
              // Note: Now we need to register the blob in TinyMCEs image blob
              // registry. In the next release this part hopefully won't be
              // necessary, as we are looking to handle it internally.
              var id = "blobid" + new Date().getTime();
              var blobCache = tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(",")[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              // call the callback and populate the Title field with the file name
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        }
      }
    };
  },
  mounted() {
    tinymce.init(this.init);
  },
  methods: {
    handlerFunction: function() {
      tinyMCE.get(this.tinymceId).getContent();

      // console.log(this.tinymceHtml);
      var block = document.getElementById(this.tinymceId);
      console.log(block);
      // Prism.highlightElement(block);
      console.log(Prism);
      Prism.highlightAll();
      // Using JQuery
      // Prism.highlightElement($("#some-code")[0]);
    }
  }
};
</script>