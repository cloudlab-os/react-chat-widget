import format from 'date-fns/format';
import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';

import { MessageTypes } from 'src/store/types';

import './styles.scss';

type Props = {
  message: MessageTypes;
  showTimeStamp: boolean;
}

function Message({ message, showTimeStamp }: Props) {
  const sanitizedHTML = markdownIt({ break: true })
    .use(markdownItClass, {
      img: ['rcw-message-img']
    })
    .use(markdownItSup)
    .use(markdownItSanitizer)
    .use(markdownItLinkAttributes, { attrs: { target: '_blank', rel: 'noopener' } })
    .render(message.text);
  function handleOnClick(event) {
    const element = event.target;
    try {
      //复制代码
      if (element.nodeName === "PRE") {
        // 计算copy元素相对位置
        const rect = element.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        // 判断点击位置是否在 "Copy" 按钮区域内
        const top = event.clientY - rect.top
        const right = rect.width - clickX
        // console.log(right, top)
        if (7 < right && right < 29
          && 6 < top && top < 27) {
          const code = element.firstChild.innerText;
          navigator.clipboard.writeText(code).then(() => {
            element.classList.add('copied');
            setTimeout(() => {element.classList.remove('copied');},2000)
          }).catch(err => {
            console.error('Failed to copy: ', err);
          });
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className={`rcw-${message.sender}`}>
      <div className="rcw-message-text" onClick={handleOnClick} dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/,'') }} />
      {showTimeStamp && <span className="rcw-timestamp">{format(message.timestamp, 'hh:mm')}</span>}
    </div>
  );
}

export default Message;
