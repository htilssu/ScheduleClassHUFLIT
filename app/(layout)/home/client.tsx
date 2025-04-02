"use client";

import React from "react";
import MainContent from "@/app/(layout)/home/components/MainContent";
import Notify from "@/app/(layout)/home/components/Notify";
import { Container, Grid, Box } from "@mantine/core";

export default function HomePage() {
  return (
    <Box mb={20}>
      <Container size="xl" mt={5}>
        <Grid gutter={{ base: 0, lg: "md" }}>
          <Grid.Col span={{ base: 12, lg: 9 }}>
            <MainContent />
          </Grid.Col>
          <Grid.Col span={{ lg: 3 }} visibleFrom="lg">
            <Box style={{ position: "fixed" }} className={"lg:w-[23%]  mr-1"}>
              <Notify />
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
 