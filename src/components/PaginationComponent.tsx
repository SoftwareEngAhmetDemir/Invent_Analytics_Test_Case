// src/components/PaginationComponent.tsx
import React from "react";
import { Pagination } from "@mui/material";

interface PaginationComponentProps {
  totalResults: number;
  page: number;
  pageSize:number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalResults,
  page,
  pageSize,
  handlePageChange,
}) => {
  return (
    <Pagination
      count={Math.ceil(totalResults / pageSize)}
      page={page}
      onChange={handlePageChange}
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        color: "#4CAF4F",
        "& .MuiPaginationItem-root": {
          color: "#4CAF4F",
          transition: "box-shadow 0.3s ease",
          fontSize: "1rem",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
        },
        "& .Mui-selected": {
          backgroundColor: "#4CAF4F !important",
          color: "white",
          boxShadow: "0px 2px 4px rgba(76, 175, 79, 0.5)",
        },
        "& .MuiPaginationItem-root:hover": {
          boxShadow: "0px 2px 4px rgba(76, 175, 79, 0.5)",
        },
      }}
    />
  );
};

export default PaginationComponent;
