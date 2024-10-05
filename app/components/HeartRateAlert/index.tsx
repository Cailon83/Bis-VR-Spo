import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "./style";
import YoutubeIframe from "react-native-youtube-iframe";
import * as ScreenOrientation from "expo-screen-orientation";
import { authorize } from 'react-native-app-auth'; 
import axios from 'axios'; 

export const VIDEO_HEIGHT = 200;

const spotifyAuthConfig = {
  clientId: '9b45f364bd204eb396723099f754d8d8',
  redirectUrl: 'myapp://callback',  // URL de redirecionamento (configure no dashboard do Spotify)
  scopes: ['user-read-private', 'playlist-read-private', 'user-modify-playback-state'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

const HeartRateAlert = () => {
  const [showVideo, setShowVideo] = useState(false);

  const handleNotImplementedAlert = () => {
    Alert.alert("Esta funcionalidade ainda não está implementada.");
  };

  const onFullScreenChange = useCallback((isFullScreen: boolean) => {
    if (isFullScreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }, []);

  const openYouTube = () => {
    setShowVideo(true);
  };

  const handleSpotifyLoginAndPlay = async () => {
    try {
      const authState = await authorize(spotifyAuthConfig);

      const playlistId: string = '2ui7nVDDOnKHNunolJaIx8';

      await playPlaylist(authState.accessToken, playlistId);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Não foi possível conectar ao Spotify", error.message);
      } else {
        Alert.alert("Erro desconhecido");
      }
    }
  };

  const playPlaylist = async (accessToken: string, playlistId: string) => {
    try {
      await axios.put(`https://api.spotify.com/v1/me/player/play`,
        { context_uri: `spotify:playlist:${playlistId}` },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log('Playlist is playing!');
      Alert.alert("A playlist está tocando no seu dispositivo!");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro ao tocar a playlist", error.message);
      } else {
        Alert.alert("Erro desconhecido ao tocar a playlist");
      }
    }
  };

  return (
    <View style={styles.alertContainer}>
      <View style={styles.heartIconWrapper}>
        <Text style={styles.heartIcon}>❤️</Text>
      </View>
      <Text style={styles.alertTitle}>Atenção!!</Text>
      <Text style={styles.alertMessage}>
        Seus batimentos cardíacos ultrapassaram 100bpm.
      </Text>
      <Text style={styles.alertPrompt}>Você gostaria...</Text>
      <View style={styles.buttonRow}>
        {/* Botão para autenticar no Spotify e tocar uma playlist */}
        <TouchableOpacity onPress={handleSpotifyLoginAndPlay} style={styles.alertButton}>
          <Text style={styles.alertButtonText}>Escutar Playlist</Text>
        </TouchableOpacity>
        {/* Botão para abrir o vídeo no YouTube */}
        <TouchableOpacity onPress={openYouTube} style={styles.alertButton}>
          <Text style={styles.alertButtonText}>Participar de uma Imersão</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleNotImplementedAlert} style={styles.alertButtonFullWidth}>
        <Text style={styles.alertButtonText}>
          Estou apenas realizando uma atividade física.
        </Text>
      </TouchableOpacity>

      {showVideo && (
        <View style={styles.videoContainer}>
          <YoutubeIframe
            videoId="eKumVFvGHFA"
            height={VIDEO_HEIGHT}
            onFullScreenChange={onFullScreenChange}
          />
        </View>
      )}
    </View>
  );
};

export default HeartRateAlert;
