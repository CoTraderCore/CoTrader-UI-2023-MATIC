import { Card, CardBody } from '@chakra-ui/react';
import React from 'react'
import DashboardHeader from '../common/DashboardHeader';
import Header from '../common/Header';

function Dashboard() {
  return (
    <div style={{ padding: "10px" }}>
      <Header heading="Dashboard" />
      <DashboardHeader />
    </div>
  )
}

export default Dashboard

