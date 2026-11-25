import { useRef, useState } from "react";
import { View, Text, Button, ActivityIndicator, Image, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function CameraDemo() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [photo, setPhoto] = useState(null);
    const [isTaking, setIsTaking] = useState(false);

    const takePhoto = async () => {
        if (!cameraRef.current || isTaking) return;

        try {
            const result = await cameraRef.current.takePictureAsync({ quality: 0.5 });
            setPhoto(result);
        } finally {
            setIsTaking(false);
        }
    }

    if (!permission) {
        return <ActivityIndicator />
    }

    if (!permission.granted) {
        return (
            <View style={styles.wrapper}>
                <Text>The camera is needed to take photo proof of your finished tasks</Text>
                <Button title="Allow camera" onPress={requestPermission} />
            </View>
        )
    }

    if (photo) {
        return (
            <View style={styles.wrapper}>
                <Image source={{ uri: photo.uri }} style={styles.frame} />
                <Button title="Retake" onPress={() => setPhoto(null)} />
            </View>
        )
    }

    return (
        <View style={styles.wrapper}>
            <CameraView ref={cameraRef} style={styles.frame} face="back" />
            <Button
                title={isTaking ? "Taking Photo.." : "Take Photo"}
                onPress={takePhoto}
                disabled={isTaking}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        padding: 16,
        gap: 12,
    },
    frame: {
        width: '100%',
        aspectRatio: 3 / 4,
    },
});