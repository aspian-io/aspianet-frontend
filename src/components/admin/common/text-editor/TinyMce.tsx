import React, { forwardRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { EditorEvent } from 'tinymce';

interface IProps {
  content?: string;
  onEditorChange?: (content: string) => any;
  onBlur?: (
    e: EditorEvent<{
      focusedEditor: Editor | null;
    }>
  ) => any;
  onChange?: (e: any) => any;
  menubar?: boolean;
  mini?: boolean;
  height?: number;
  style?: string;
}

const TinyMce = forwardRef<Editor, IProps>(
  (
    {
      content,
      onEditorChange = (c) => {},
      onChange = (e) => {},
      onBlur = (e) => {},
      menubar = true,
      mini = false,
      height = 500,
      style = 'border-radius: 16px',
    },
    ref
  ) => {
    const fullPlugins =
      'importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media codesample table pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons';
    const fullToolbar =
      'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  print | insertfile image media link anchor codesample | ltr rtl code';

    const miniPlugins =
      'autolink directionality code link codesample anchor charmap insertdatetime lists wordcount emoticons';
    const miniToolbar =
      'undo redo | bold italic underline strikethrough | link | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | charmap emoticons | ltr rtl code';

    return (
      <Editor
        ref={ref}
        tinymceScriptSrc={'/assets/libs/tinymce/tinymce.min.js'}
        initialValue={content}
        onInit={(a, editor) => {
          editor
            .getContainer()
            .setAttribute(
              'style',
              `${editor.getContainer().getAttribute('style')} ${style}`
            );
        }}
        init={{
          branding: false,
          promotion: false,
          height,
          menubar,
          plugins: mini ? miniPlugins : fullPlugins,
          toolbar: mini ? miniToolbar : fullToolbar,
          content_css: '/assets/libs/tinymce/custom-content.css',
          quickbars_selection_toolbar:
            'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          image_class_list: [
            { title: 'None', value: '' },
            {
              title: 'Border Radius',
              menu: [
                { title: 'None', value: 'tinymce-rounded-none' },
                { title: 'Sm Rounded', value: 'tinymce-rounded-sm' },
                { title: 'Rounded', value: 'tinymce-rounded' },
                { title: 'Md Rounded', value: 'tinymce-rounded-md' },
                { title: 'Lg Rounded', value: 'tinymce-rounded-lg' },
                { title: 'XL Rounded', value: 'tinymce-rounded-xl' },
                { title: '2XL Rounded', value: 'tinymce-rounded-2xl' },
                { title: '3XL Rounded', value: 'tinymce-rounded-3xl' },
                { title: 'Full', value: 'tinymce-rounded-full' },
              ],
            },
          ],
          image_advtab: true,
          image_caption: true,
          toolbar_mode: 'sliding',
          contextmenu: 'link image table',
          table_class_list: [
            { title: 'None', value: '' },
            {
              title: 'Border Radius',
              menu: [
                { title: 'None', value: 'tinymce-rounded-none' },
                { title: 'Sm Rounded', value: 'tinymce-rounded-sm' },
                { title: 'Rounded', value: 'tinymce-rounded' },
                { title: 'Md Rounded', value: 'tinymce-rounded-md' },
                { title: 'Lg Rounded', value: 'tinymce-rounded-lg' },
                { title: 'XL Rounded', value: 'tinymce-rounded-xl' },
                { title: '2XL Rounded', value: 'tinymce-rounded-2xl' },
                { title: '3XL Rounded', value: 'tinymce-rounded-3xl' },
                { title: 'Full', value: 'tinymce-rounded-full' },
              ],
            },
          ],
        }}
        onEditorChange={onEditorChange}
        onChange={onChange}
        onBlur={(e) => onBlur(e as any)}
      />
    );
  }
);

TinyMce.displayName = 'TinyMce';

export default TinyMce;
