import React, { useMemo, useState, useCallback } from "react";
import { Slate, Editable, withReact, useSlate, ReactEditor } from "slate-react";
import {
  createEditor,
  Descendant,
  Transforms,
  Editor,
  Element,
  BaseEditor,
  Node,
} from "slate";
import { withHistory } from "slate-history";

// Define custom types
type CustomElement = {
  type: "paragraph" | "heading1" | "heading2" | "heading3";
  children: CustomText[];
};

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
};

// Extend Slate's custom types
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

// Define block types
type BlockType = CustomElement["type"];

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

type MarkFormat = "bold" | "italic" | "underline" | "strikethrough";

const MarkButton = ({ format, icon }: { format: MarkFormat; icon: string }) => {
  const editor = useSlate();

  const isMarkActive = (
    editor: BaseEditor & ReactEditor,
    format: MarkFormat
  ) => {
    const marks = Editor.marks(editor) as Partial<
      Record<MarkFormat, boolean>
    > | null;
    return marks ? marks[format] === true : false;
  };

  const toggleMark = (editor: BaseEditor & ReactEditor, format: MarkFormat) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      className={`p-2 ${isMarkActive(editor, format) ? "bg-gray-200" : ""}`}
    >
      {icon}
    </button>
  );
};

const BlockButton = ({ format, icon }: { format: BlockType; icon: string }) => {
  const editor = useSlate();

  const isBlockActive = (
    editor: BaseEditor & ReactEditor,
    format: BlockType
  ) => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
      })
    );

    return !!match;
  };

  const toggleBlock = (editor: BaseEditor & ReactEditor, format: BlockType) => {
    const isActive = isBlockActive(editor, format);
    const newProperties: Partial<CustomElement> = {
      type: isActive ? "paragraph" : format,
    };

    Transforms.setNodes(editor, newProperties, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n),
    });
  };

  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      className={`p-2 ${isBlockActive(editor, format) ? "bg-gray-200" : ""}`}
    >
      {icon}
    </button>
  );
};

const SlateEditor = () => {
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);

  const renderElement = useCallback(
    (props: {
      attributes: any;
      children: React.ReactNode;
      element: CustomElement;
    }) => {
      switch (props.element.type) {
        case "heading1":
          return (
            <h1 {...props.attributes} className="text-2xl font-bold">
              {props.children}
            </h1>
          );
        case "heading2":
          return (
            <h2 {...props.attributes} className="text-xl font-bold">
              {props.children}
            </h2>
          );
        case "heading3":
          return (
            <h3 {...props.attributes} className="text-lg font-bold">
              {props.children}
            </h3>
          );
        default:
          return <p {...props.attributes}>{props.children}</p>;
      }
    },
    []
  );

  const renderLeaf = useCallback(
    (props: {
      attributes: any;
      children: React.ReactNode;
      leaf: CustomText;
    }) => {
      let { children } = props;
      if (props.leaf.bold) {
        children = <strong>{children}</strong>;
      }
      if (props.leaf.italic) {
        children = <em>{children}</em>;
      }
      if (props.leaf.underline) {
        children = <u>{children}</u>;
      }
      if (props.leaf.strikethrough) {
        children = <s>{children}</s>;
      }
      return <span {...props.attributes}>{children}</span>;
    },
    []
  );

  return (
    <Slate editor={editor} initialValue={value} onChange={setValue}>
      <div className="border border-gray-300 p-2 mb-2">
        <MarkButton format="bold" icon="B" />
        <MarkButton format="italic" icon="I" />
        <MarkButton format="underline" icon="U" />
        <MarkButton format="strikethrough" icon="S" />
        <BlockButton format="heading1" icon="H1" />
        <BlockButton format="heading2" icon="H2" />
        <BlockButton format="heading3" icon="H3" />
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Leave a comment if you'd like"
        className="border border-gray-300 p-2 min-h-[200px]"
      />
    </Slate>
  );
};

export default SlateEditor;
