// @flow
import React, { useState } from "react";
import { FixedSizeList, areEqual } from "react-window";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import ControlPointOutlinedIcon from '@material-ui/icons/ControlPointOutlined';
import store from './rules.json'
import { Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

// Loading the data as per requirement 
const initial = store.data.map(({ id, ruleName }) => ({ "id": id, "text": ruleName }))


function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function getStyle({ provided, style, isDragging }) {
  // If you don't want any spacing between your items
  // then you could just return this.
  // I do a little bit of magic to have some nice visual space
  // between the row items
  const combined = {
    ...style,
    ...provided.draggableProps.style
  };

  const marginBottom = 8;
  const withSpacing = {
    ...combined,
    height: isDragging ? combined.height : combined.height - marginBottom,
    marginBottom
  };
  return withSpacing;
}

function App() {
  const [items, setItems] = useState(initial);

  function Item({ provided, item, index, style, isDragging }) {
    return (

      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        style={getStyle({ provided, style, isDragging })}
        className={`item ${isDragging ? "is-dragging" : ""}`}
      >

        <Typography variant="caption" style={{ overflow: "hidden", textOverflow: "ellipsis", width: '11rem' }}>
          {item.text}
        </Typography>
        <br></br>
        <Typography variant="caption" style={{ overflow: "hidden", textOverflow: "ellipsis", width: '11rem' }}>
          {item.id}
        </Typography>
        <Tooltip title="Delete">
          <IconButton color="secondary" onClick={() => {
            const newState = [...items];
            newState.splice(index, 1);
            setItems(newState);
          }}><DeleteIcon /></IconButton>
        </Tooltip>
        <Tooltip color="primary" title="Clone">
          <IconButton onClick={() => {
            let newState = [...items];
            debugger;
            newState = [...newState.slice(0, index),
            { id: `Clone:${newState.length + 1}`, text: `${item.text}C` }, ...newState.slice(index)];
            setItems(newState);
          }}><ControlPointOutlinedIcon /></IconButton>
        </Tooltip>
      </div>

    );
  }

  // Recommended react-window performance optimisation: memoize the row render function
  // Things are still pretty fast without this, but I am a sucker for making things faster
  const Row = React.memo(function Row(props) {
    const { data: items, index, style } = props;
    const item = items[index];
    return (
      <Draggable draggableId={item.id} index={index} key={item.id}>
        {(provided) => (
          <Item provided={provided} index={index} item={item} style={style} />
        )}
      </Draggable>
    );
  }, areEqual);
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.source.index === result.destination.index) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(newItems);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <Droppable
          droppableId="droppable"
          mode="virtual"
          renderClone={(provided, snapshot, rubric) => (
            <Item
              provided={provided}
              isDragging={snapshot.isDragging}
              item={items[rubric.source.index]}
            />
          )}
        >
          {(provided) => (
            <FixedSizeList
              height={610}
              itemCount={items.length}
              itemSize={80}
              width={500}
              outerRef={provided.innerRef}
              itemData={items}
            >
              {Row}
            </FixedSizeList>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
