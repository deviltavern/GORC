package com.main.Tool;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class XMLTool {


    public String folder;
    public  String xmlName;
    public  Document xmlDocument;

    public String filePath;
    Node sizeNode;
    Node nameNode ;
   public Node labelListNode ;
    Node describeNode ;
    Node widthNode ;
    Node heightNode ;
    Node root;

    public List<Integer> labelList = new ArrayList<>();


    public XMLTool(String folder,String xmlName) throws IOException, SAXException, ParserConfigurationException {
        this.folder = folder;
        this.xmlName = xmlName;
        this.filePath = folder+xmlName;

        Debug.Log("读取的xml文件 = "+this.filePath);
        xmlDocument = getXMLFile();

    }

    public XMLTool(){


    }
    /**
     * 创建xml
     */
    public Document createConfigXml(String folderName) throws Exception {


        File file = new File(folderName + "/Config.xml");

        FileOutputStream fos = new FileOutputStream(file);
        fos.write("<root></root>".getBytes());
        fos.close();
        if (file.exists() == false) {

            file.createNewFile();
        }


        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        //获取具体的解析器
        DocumentBuilder db = dbf.newDocumentBuilder();
        //解析xml文件，获取document对象
        xmlDocument = db.parse(file);


        root = xmlDocument.getFirstChild();
        sizeNode = xmlDocument.createElement("size");
        nameNode = xmlDocument.createElement("name");

        labelListNode = xmlDocument.createElement("labelList");
        describeNode = xmlDocument.createElement("describe");

        widthNode = xmlDocument.createElement("width");


        heightNode = xmlDocument.createElement("height");
        widthNode.setTextContent("512");
        heightNode.setTextContent("512");


        root.appendChild(nameNode);
        root.appendChild(sizeNode);
        root.appendChild(labelListNode);
        root.appendChild(describeNode);

        sizeNode.appendChild(widthNode);
        sizeNode.appendChild(heightNode);
        saveDocument(xmlDocument,file.getAbsolutePath());

        return xmlDocument;
    }


    public  static void saveDocument(Document document,String str) throws Exception
    {
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        //step10:获得一个Transformer对象
        Transformer transformer = transformerFactory.newTransformer();
        //step11:把document对象用一个DOMSource对象包装起来
        Source xmlSource = new DOMSource(document);
        //step12:建立一个存储目标对象
        Result outputTarget = new StreamResult(new File(str));
        //step13:生成相应的xml文件
        transformer.setOutputProperty("encoding", "UTF-8");
        transformer.transform(xmlSource, outputTarget);
    }

    public void setHeight(int height){

        this.heightNode.setTextContent(height+"");

    }
    public  void  setWidth(int width){

        this.widthNode.setTextContent(width+"");
    }


    public void addNewImage(int type,String fileName) throws Exception {
        Node lbNode = xmlDocument.createElement("lb");
        ((Element) lbNode).setAttribute("fileName",fileName);
        lbNode.setTextContent(""+type);
        labelListNode.appendChild(lbNode);
        saveDocument(xmlDocument, this.filePath);



    }

    public void addTypeDescribe(int type,String describe) throws Exception {

        Node label_type = xmlDocument.createElement("labelType");
        Node label_value = xmlDocument.createElement("labelValue");
        Node label_describe = xmlDocument.createElement("labelDescribe");
        label_value.setTextContent(type+"");
        label_describe.setTextContent(describe);

        describeNode.appendChild(label_type);
        label_type.appendChild(label_value);
        label_type.appendChild(label_describe);

        saveDocument(xmlDocument, this.filePath);
    }

    public Document getXMLFile() throws ParserConfigurationException, IOException, SAXException {


        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        //获取具体的解析器
        DocumentBuilder db = dbf.newDocumentBuilder();
        //解析xml文件，获取document对象
        Document document = db.parse(new File(folder+xmlName));
        root=document.getFirstChild();
        sizeNode= root.getChildNodes().item(0);
        nameNode = root.getChildNodes().item(1);
        labelListNode = root.getChildNodes().item(2);
        describeNode = root.getChildNodes().item(3);
        widthNode = sizeNode.getChildNodes().item(0);
        heightNode =sizeNode.getChildNodes().item(1);
        for (int i = 0;i<labelListNode.getChildNodes().getLength();i++){
            Debug.Log("读取数据 = "+labelListNode.getChildNodes().item(i).getAttributes().getNamedItem("fileName"));

            Element el = (Element) labelListNode.getChildNodes().item(i);
            labelList.add(new Integer(el.getAttribute("fileName")));


        }


        return  document;

    }


    public void insertNewNode(){




    }


    public void  createNode(String NodeName){



    }
}
