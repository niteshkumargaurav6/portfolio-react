import React from "react";

export function FloatingDock({ items, mobileClassName }) {
  return (
    <div className={`floating-dock ${mobileClassName} fixed bottom-4 left-1/2 transform -translate-x-1/2`}>
      <ul className="flex flex-row items-center space-x-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <a href={item.href} className="flex items-center space-x-2">
              {item.icon}
              <span className="text-neutral-500 dark:text-neutral-300">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
