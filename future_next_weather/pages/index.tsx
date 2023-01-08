import type { NextPage } from 'next';
import React, { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Group, Paper, Text, TextInput, Button } from '@mantine/core'; 
import { RangeCalendar, Calendar } from '@mantine/dates';
import { Inter } from '@next/font/google'

const NEXT_APP_API_KEY = "02c25bb57d88f9a6fa989e28e53b15a2";

export default function Home() {
  const [cityInput, setCityInput] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>({});

  async function getWeatherData() {
    try {
      const serverResponse = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?" + 
      "q=" +
      cityInput +
      "&appid=" +
      NEXT_APP_API_KEY +
      "&units=imperial"
    )
        const data = await serverResponse.json();
        console.log(data);
        if (data?.cod === "400") throw data;
        setWeatherData(data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
      <section style={{ position: "static", height: "100vh", backgroundImage: "url('https://littlevisuals.co/images/headlights.jpg')", backgroundSize: "cover"}}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
        <Paper withBorder p="lg" style={{ maxWidth: "500px" }}>
          <Group position="apart">
            <Text size="xl" weight="300" mb="xl">
              TALK ABOUT THE WEATHER
            </Text>
          </Group>
          <Group position="apart">
            <Text size="sm" mb="sm">
              what is the temperature in...
            </Text>
          </Group>
           <Group position="apart" mb="xl">
            <TextInput placeholder="enter city name" onChange={ (e) => setCityInput(e.target.value) } />
          </Group>
          <Group position="apart">
            <Button variant="gradient" size="sm" onClick={() => getWeatherData()}>
              weather
            </Button>
          </Group>
          {Object.keys(weatherData).length !== 0 ? 
          <>
           <Group position="left" mt="xl">
            <Text> the weather in { weatherData.name } is currently { weatherData.main.temp } &deg;F</Text>
          </Group>
          </>
          : null}
        </Paper>
        </div>
      </section>
  )
}
