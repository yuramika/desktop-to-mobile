import React, { useState, useRef } from "react";


function MobileTableConverter() {
  const [generatedCode, setGeneratedCode] = useState("");
  const [output, setOutput] = useState("");
  const [desktopTableCode, setDesktopTableCode] = useState("");
  const [error, setError] = useState(null);

  function transformTable() {
    if (!desktopTableCode.trim()) {
      alert("Вставьте код таблицы в поле!");
      return;
    }

    const desktopTable = document.createElement("div");
    desktopTable.innerHTML = desktopTableCode;

    const headerCells = desktopTable.querySelectorAll("thead th");

    if (headerCells.length > 0) {
      
      const headerCells = desktopTable.querySelectorAll("thead th");
      const rows = desktopTable.querySelectorAll("tbody tr");

      let generatedCode = ` <div class="mobile-table" style="max-width: 340px;">`;

      rows.forEach((row, rowIndex) => {
        const cells = row.querySelectorAll("td");

        generatedCode += `
          <div class="mobile-table__section">
            <div class="mobile-table__row">
              <div class="mobile-table__key" width="60%"><strong>[nobr]${cells[0].textContent}[/nobr]</strong></div>
              <div class="mobile-table__value" width="70%"></div>
            </div>`;

        for (let columnIndex = 1; columnIndex < headerCells.length; columnIndex++) {
          generatedCode += `
            <div class='mobile-table__row'>
              <div class='mobile-table__key' align="left">${headerCells[columnIndex].textContent}</div>
              <div class='mobile-table__value'>${cells[columnIndex].textContent}</div>
            </div>
          `;
        }

        generatedCode += `
          </div> 
        `;
      });

      generatedCode = ` 
        ${generatedCode}
      </div>
    `;

      setGeneratedCode(generatedCode);
      setOutput(generatedCode);
    } else {
      
      const rows = desktopTable.querySelectorAll("tbody tr");

      let generatedCode = `
      <div class="mobile-table" style="max-width: 340px;">
        <div class="mobile-table__section">
      `;;

    
      

      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");

        generatedCode += `
          <div class="mobile-table__row">
            <div class="mobile-table__key" width="70%" align="left">${cells[0].textContent}</div>
            <div class="mobile-table__value" width="30%">${cells[1].textContent}</div>
          </div>`;
      });

      generatedCode += `
        </div> 
      </div>
    `;

      setGeneratedCode(generatedCode);
      setOutput(generatedCode);
    }
  }
      



const [isVisible, setIsVisible] = useState(false);

const handleClick = () => {
  setIsVisible(true);

  setTimeout(() => {
    setIsVisible(false);
  }, 700);
};

const clearTextareaLeft = () => {
  if (!desktopTableCode.trim()) {
    alert("Поле пустое, вставьте код таблицы!");
    return;
  }
  setDesktopTableCode("");
};

const clearTextareaRight = () => {
  setOutput("");
};

const textareaRef = useRef(null);

const copyToClipboard = () => {
  if (textareaRef.current) {
    const textValue = textareaRef.current.value;

    if (textValue.trim() === "") {
      alert("Ошибка при копировании текста: поле пустое!");
      return;
    }

    textareaRef.current.select();
    navigator.clipboard.writeText(textValue)
      .then(() => {
        console.log('Текст скопирован успешно');
        handleClick();
      })
      .catch((err) => {
        console.error('Ошибка при копировании текста:', err);
        alert("Ошибка при копировании текста");
      });
  }
};

return (
  <>
    <div className={`copy-block ${isVisible ? "copy-block_visible" : ""}`}>
      <span className="copy-block__text">Текст скопирован</span>
    </div>
    <div className="main-container">
      <div className="content-container">
        <textarea
          className="content-container__panel"
          rows="10"
          value={desktopTableCode}
          onChange={(event) => setDesktopTableCode(event.target.value)}
          placeholder="Вставьте код таблицы сюда..."
        />
        <div className="button-container">
          <button onClick={transformTable} className="button"><span>Преобразовать</span></button>
          <button onClick={clearTextareaLeft} className="button"><span>Очистить</span></button>
        </div>
      </div>

      <div className="content-container">
        <textarea
          className="content-container__panel"
          rows="10"
          placeholder="Скопируйте готовый код отсюда"
          ref={textareaRef}
          value={output}
          readOnly
        />
        <div className="button-container">
          <button onClick={copyToClipboard} className="button"><span>Копировать</span></button>
          <button onClick={clearTextareaRight} className="button"><span>Очистить</span></button>
        </div>
      </div>
    </div>
  </>
);
}

export default MobileTableConverter;
