import React from "react";
import { useParams } from "react-router-dom";

function NoteDetail() {
  const { id } = useParams();

  return (
    <div>
      <h2>메모 상세 정보</h2>
    </div>
  );
}

export default NoteDetail;
