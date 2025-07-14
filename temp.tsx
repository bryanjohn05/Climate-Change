//temp.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [data, setData] = useState([]);

  // Fetch mock or static data for demo purposes
  useEffect(() => {
    fetch('/climate-predictions.json')  // Serve this JSON from public or API
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Climate (2024 - 2030)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={['auto', 'auto']} label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="PredictedTemperature" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="text-lg font-medium mb-2">Model Info</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside">
            <li>Model: Random Forest Regressor</li>
            <li>Trained on: 1900–2023</li>
            <li>R² Score: ~0.45</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="text-lg font-medium mb-2">Download Models</h3>
          <Button className="mr-2" asChild>
            <a href="/linear_temp_model.pkl" download>Linear Model</a>
          </Button>
          <Button asChild>
            <a href="/rf_temp_model.pkl" download>Random Forest Model</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
