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
        // language_url: "/static/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/static/tinymce/skins/lightgray",
        height: 300,
        plugins: [
          "advlist autosave  autolink  anchor",
          "code codesample colorpicker contextmenu charmap",
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
        toolbar:
          "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat",
        branding: false
      }
    };
  },
  mounted() {
    tinymce.init({});
  },
  components: { Editor }
};
</script>