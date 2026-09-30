// SHAT Platform — Rich Text Content Editor (components/cms/RichTextEditor.js)
// Lightweight, responsive semantic rich editor with XSS sanitization & mobile toolbar

export function sanitizeHtml(rawHtml) {
  if (!rawHtml) return '';
  // Basic sanitization: strip script, iframe, onload, onerror, javascript:
  return rawHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/href="javascript:[^"]*"/gi, 'href="#"');
}

export function RichTextEditor({ id = 'cms-rich-editor', initialContent = '', placeholder = 'اكتب تفاصيل المحتوى هنا...' } = {}) {
  const sanitized = sanitizeHtml(initialContent);

  return `
    <div class="shat-rich-editor-wrapper" id="${id}-wrapper" style="border: 1.5px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; background: #ffffff;">
      <!-- Formatting Toolbar -->
      <div class="shat-rich-toolbar" style="display: flex; flex-wrap: wrap; gap: 4px; padding: 8px 12px; background: #f8fafc; border-bottom: 1px solid var(--border-subtle); align-items: center;">
        <button type="button" class="rich-btn" data-command="formatBlock" data-val="h2" title="عنوان رئيسي (H2)">H2</button>
        <button type="button" class="rich-btn" data-command="formatBlock" data-val="h3" title="عنوان فرعي (H3)">H3</button>
        <button type="button" class="rich-btn" data-command="formatBlock" data-val="p" title="فقرة عادية">P</button>
        <span class="rich-sep" style="width: 1px; height: 18px; background: var(--border-subtle); margin: 0 4px;"></span>
        <button type="button" class="rich-btn font-bold" data-command="bold" title="عريض (Bold)"><strong>B</strong></button>
        <button type="button" class="rich-btn italic" data-command="italic" title="مائل (Italic)"><em>I</em></button>
        <button type="button" class="rich-btn underline" data-command="underline" title="تسطير (Underline)"><u>U</u></button>
        <span class="rich-sep" style="width: 1px; height: 18px; background: var(--border-subtle); margin: 0 4px;"></span>
        <button type="button" class="rich-btn" data-command="insertUnorderedList" title="قائمة نقطية">• قائمة</button>
        <button type="button" class="rich-btn" data-command="insertOrderedList" title="قائمة مرقمة">1. قائمة</button>
        <button type="button" class="rich-btn" data-command="formatBlock" data-val="blockquote" title="اقتباس">“ اقتباس</button>
        <span class="rich-sep" style="width: 1px; height: 18px; background: var(--border-subtle); margin: 0 4px;"></span>
        <button type="button" class="rich-btn" data-command="createLink" title="إدراج رابط">🔗 رابط</button>
        <button type="button" class="rich-btn" data-command="removeFormat" title="مسح التنسيق">⌫ مسح</button>
        <button type="button" class="rich-btn" data-command="undo" title="تراجع">↩</button>
        <button type="button" class="rich-btn" data-command="redo" title="إعادة">↪</button>
      </div>

      <!-- Editable Area -->
      <div 
        id="${id}" 
        class="shat-rich-content-editable" 
        contenteditable="true" 
        data-placeholder="${placeholder}"
        style="min-height: 220px; max-height: 480px; overflow-y: auto; padding: 16px; font-size: var(--font-size-body); line-height: 1.8; color: var(--text-primary); outline: none;"
      >${sanitized || `<p>${placeholder}</p>`}</div>
    </div>
  `;
}

export function initRichTextEditor(editorId, onChangeCallback) {
  const wrapper = document.getElementById(`${editorId}-wrapper`);
  const editor = document.getElementById(editorId);
  if (!wrapper || !editor) return;

  const buttons = wrapper.querySelectorAll('.rich-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cmd = btn.getAttribute('data-command');
      const val = btn.getAttribute('data-val') || null;

      if (cmd === 'createLink') {
        const url = prompt('أدخل رابط الويب:', 'https://');
        if (url) document.execCommand('createLink', false, url);
      } else {
        document.execCommand(cmd, false, val);
      }
      editor.focus();
      if (typeof onChangeCallback === 'function') {
        onChangeCallback(sanitizeHtml(editor.innerHTML));
      }
    });
  });

  editor.addEventListener('input', () => {
    if (typeof onChangeCallback === 'function') {
      onChangeCallback(sanitizeHtml(editor.innerHTML));
    }
  });

  editor.addEventListener('focus', () => {
    if (editor.innerText.trim() === editor.getAttribute('data-placeholder')) {
      editor.innerHTML = '<p><br></p>';
    }
  });
}
