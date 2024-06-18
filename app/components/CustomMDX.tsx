import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { highlight } from "sugar-high";

function Table({ data }) {
    let headers = data.headers.map((header, index) => <th key={index}>{header}</th>);
    let rows = data.rows.map((row, index) => (
        <tr key={index}>
            {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
            ))}
        </tr>
    ));

    return (
        <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

const linkClass = "underline underline-offset-4 font-normal hover:bg-primary";
function CustomLink(props) {
    let href = props.href;

    if (href.startsWith("/")) {
        return (
            <Link className={linkClass} href={href} {...props}>
                {props.children}
            </Link>
        );
    }

    if (href.startsWith("#")) {
        return <a className={linkClass} {...props} />;
    }

    return <a className={linkClass} target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
    return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Code({ children, ...props }) {
    let codeHTML = highlight(children);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str) {
    return str
        .toString()
        .toLowerCase()
        .trim() // Remove whitespace from both ends of a string
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w-]+/g, "") // Remove all non-word characters except for -
        .replace(/--+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
    const Heading = ({ children }) => {
        let slug = slugify(children);
        return React.createElement(
            `h${level}`,
            { id: slug },
            [React.createElement("a", { href: `#${slug}`, key: `link-${slug}`, className: "anchor" })],
            children
        );
    };

    Heading.displayName = `Heading${level}`;

    return Heading;
}

let components = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    Image: RoundedImage,
    a: CustomLink,
    code: Code,
    Table,
};

export function CustomMDX(props) {
    return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />;
}
