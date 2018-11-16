<template>
    <div class='tinymce'>
        <h1>tinymce</h1>
        <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>
        <div v-html='tinymceHtml'></div>
    </div>
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

export default {
  name: "tinymce",
  data() {
    return {
      tinymceHtml: "请输入内容",
      init: {
        selector: "tinymce",
        // language_url: "/static/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        body_class: "panel-body ",
        object_resizing: false,
        skin_url: "/static/tinymce/skins/lightgray",
        skin: "lightgray",

        height: 500,
        theme: "modern",
        plugins:
          "print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount tinymcespellchecker a11ychecker imagetools mediaembed  linkchecker contextmenu colorpicker textpattern help",
        toolbar1:
          "formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat",
        image_advtab: true,
        templates: [
          { title: "Test template 1", content: "Test 1" },
          { title: "Test template 2", content: "Test 2" }
        ],
        content_css: [
          "//fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
          "//www.tinymce.com/css/codepen.min.css"
        ]
      }
    };
  },
  mounted() {
    tinymce.init({});
  },
  components: { Editor }
};
</script>