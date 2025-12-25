import React, { ReactNode } from 'react';
import { Popover, ArrowContainer } from 'react-tiny-popover'; 

interface PopoverContainerProps {
  isPopoverOpen: boolean;
  setPopoverToggle: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  PopoverContent: ReactNode;
  options?: any;
}

const PopoverContainer: React.FC<PopoverContainerProps> = ({
  isPopoverOpen,
  setPopoverToggle,
  children,
  PopoverContent,
  options
}) => {  

  const togglePopover = () => {
    setPopoverToggle((prev) => !prev);
  };  

  const defaultOptions = {
    position: 'bottom',
    padding: 10,
    arrowColor: 'black',
    arrowSize: 10,
    arrowStyle: { opacity: 0.7 },
    className: 'popover-arrow-container',
    arrowClassName: 'popover-arrow',
    positions: ['top', 'bottom', 'left', 'right'],
    ...options,
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={defaultOptions.positions}
      padding={10}
      onClickOutside={() => setPopoverToggle(false)}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={defaultOptions.arrowColor}
          arrowSize={defaultOptions.arrowSize}
          arrowStyle={defaultOptions.arrowStyle}
          className={defaultOptions.className}
          arrowClassName={defaultOptions.arrowClassName}
        >
          {React.cloneElement(PopoverContent as React.ReactElement)}
        </ArrowContainer>
      )}
    >
      {React.cloneElement(children as React.ReactElement, {
        onClick: togglePopover,
      })}
    </Popover>
  );
};
export default PopoverContainer;