import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography
    
  } from "@material-tailwind/react";

  export function ProfileCard() {
    return (
      <Card className="w-96">
        <CardHeader floated={false} className="h-80">
          <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Natalie Paisley
          </Typography>
          <Typography color="blue-gray" className="font-medium" >
            CEO / Co-Founder
          </Typography>
        </CardBody>
      </Card>
    );
  }

export default ProfileCard;
