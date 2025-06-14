import React, { useState, useRef, useEffect } from 'react';

const alignmentClassesMap = {
  left: 'origin-top-left start-0',
  top: 'origin-top',
  right: 'origin-top-right end-0',
};

const widthClassesMap = {
  '48': 'w-48',
};

const Dropdown = ({
  align = 'right',
  width = '48',
  contentClasses = 'py-1 bg-white',
  trigger,
  content,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const alignmentClasses = alignmentClassesMap[align] || alignmentClassesMap.right;
  const widthClass = widthClassesMap[width] || width;

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>

      {open && (
        <div
          className={`absolute z-50 mt-2 rounded-md shadow-lg ${widthClass} ${alignmentClasses}`}
          style={{ transition: 'opacity 0.2s ease, transform 0.2s ease' }}
          onClick={() => setOpen(false)}
        >
          <div className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses}`}>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
