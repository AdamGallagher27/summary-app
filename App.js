import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import React from 'react'

export default function App() {

	// get permission to access camera api
	// change the state of the camera to show it
	const [startCam, setCam] = React.useState(false)

	// request permission to use camera api
	const cameraPermission = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync()

		if (status === 'granted') {
			setCam(true)
		}
		else {
			Alert.alert('Acess Denied')
		}
	}

	// function to take picture
	const takePicture = async () => {
		// check that we have access to the camera comp
		if (!camera) return

		// take photo
		const photo = await camera.takePictureAsync()

		// photo.uri is the jpg link
		console.log(photo.uri)
	}

	return (
		<View style={styles.container}>
			{
				// if start cam show camera else show button
				startCam ? (
					<Camera
						style={{ flex: 1, width: "100%" }}
						ref={(r) => {
							camera = r
						}}
					>

						{/* button for camera */}
						<View
							style={{
								position: 'absolute',
								bottom: 0,
								flexDirection: 'row',
								flex: 1,
								width: '100%',
								padding: 20,
								justifyContent: 'space-between'
							}}
						>
							<View
								style={{
									alignSelf: 'center',
									flex: 1,
									alignItems: 'center'
								}}
							>
								<TouchableOpacity
									onPress={takePicture}
									style={{
										width: 70,
										height: 70,
										bottom: 0,
										borderRadius: 50,
										backgroundColor: '#fff'
									}}
								/>

							</View>
						</View>



					</Camera>
				) : (
					<TouchableOpacity
						onPress={cameraPermission}
						style={{
							width: 130,
							borderRadius: 4,
							backgroundColor: '#14274e',
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							height: 40
						}}
					>
						<Text
							style={{
								color: '#fff',
								fontWeight: 'bold',
								textAlign: 'center'
							}}
						>
							Start
						</Text>
					</TouchableOpacity>

				)
			}
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
