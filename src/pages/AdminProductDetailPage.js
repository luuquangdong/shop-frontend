import { Grid, Link, Paper } from "@material-ui/core";
import React from "react";
import { Link as RouteLink } from "react-router-dom";

export default function AdminProductDetailPage() {
  return (
    <div>
      <Link component={RouteLink} to="/admin/products/all">
        &lt; Trở lại trang trước
      </Link>
      <Paper>
        <Grid container>
          <div>chi tiết sản phẩm</div>
        </Grid>
      </Paper>
    </div>
  );
}
