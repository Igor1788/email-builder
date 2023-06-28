import React, { useEffect, useRef } from 'react';
import EmailEditor, { UnlayerOptions, ToolConfig } from 'react-email-editor';
import { unlayerSampleJSON } from './unlayerSampleJSON';

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
}

const emailJSON = unlayerSampleJSON;

const EmailEditorTS: React.FC = () => {
  const emailEditorRef = useRef<any>(null);

  useEffect(() => {
    if (emailEditorRef && emailEditorRef.current) {
      emailEditorRef.current.loadDesign(emailJSON);
    }
  }, []);

  const products: Product[] = [
    {
        id: 1,
        image: 'http://exemplo.com/imagem1.jpg',
        title: 'Produto 1',
        description: 'Esta é a descrição do Produto 1.'
      },
      {
        id: 2,
        image: 'http://exemplo.com/imagem2.jpg',
        title: 'Produto 2',
        description: 'Esta é a descrição do Produto 2.'
      }
  ];

  const toolConfig: ToolConfig = {
    enabled: true, 
    position: 1, 
    properties: {
      productLibrary: "Biblioteca de Produtos"
    }
  }

  const saveDesign = () => {
    emailEditorRef.current.editor.exportHtml((data: any) => {
      const { products, design, html } = data;
      const blob = new Blob([html], { type: 'text/html' });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = 'email_design.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  return (
    <>
      <button onClick={saveDesign}>Salvar o item</button>
      <EmailEditor
        ref={emailEditorRef}
        onLoad={() => console.log('ref: ', emailEditorRef.current)}
        projectId={144031}
        tools={{
          'custom#product_tool': toolConfig
        }}
        options={{
          locale: 'pt-BR',
          
          customCSS: [
            'https://examples.unlayer.com/examples/product-library-tool/productTool.css',
          ],
          customJS: [
            window.location.protocol + '//' + window.location.host + '/custom.js',
          ],
        } as UnlayerOptions}
      />
    </>
  );
};

export default EmailEditorTS;
