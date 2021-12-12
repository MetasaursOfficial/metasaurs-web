import axios from "axios";
import base64 from "base-64"
import utf8 from "base-64";

export const getDatFromIpfs = (url) => {
	const config = {}
	return new Promise((resolve, reject) => {
		axios.get(url, config).then(res => {
			resolve(res.data)
		}).catch(err => reject(err))
	})
}

export const getRandomMetadata = () => {
	const url = "https://ejg5si0mi4.execute-api.us-west-2.amazonaws.com/dev/metadata"
	console.log("Url: " + url)
	const config = {
	
	}
	return new Promise((resolve, reject) => {
		axios.get(url, config).then(res => {
			const data = res.data;
			const dataString = JSON.stringify(data)
			const payloadJson = JSON.parse(dataString)
			const encoded = payloadJson.data;
			const bytes = base64.decode(encoded);
			const text = utf8.decode(bytes);
			resolve(JSON.parse(text))
		}).catch(err => reject(err))
	})
}

export const setMinted = (tokenId) => {
	const url = "https://ejg5si0mi4.execute-api.us-west-2.amazonaws.com/dev/minted"
	const config = {
	}
	
	return new Promise((resolve, reject) => {
		axios.post(url, {tokenId: tokenId}, config).then(res => {
			console.log("setMinted: ", res)
			resolve()
		}).catch(err => {
			console.log("setMinted error: ", err)
			resolve()
		})
	})
	
}

export const getMultipleMetadata = (amount) => {
	const url = `https://ejg5si0mi4.execute-api.us-west-2.amazonaws.com/dev/multiple/${amount}`
	const config = {
	
	}
	return new Promise((resolve, reject) => {
		axios.get(url, config).then(res => {
			const data = res.data;
			const dataStr = JSON.stringify(data)
			const payloadJson = JSON.parse(dataStr)
			const response = [];
			payloadJson.data.forEach(item => {
				const bytes = base64.decode(item);
				const text = utf8.decode(bytes);
				const obj = JSON.parse(text)
				response.push(obj)
			})
			
			resolve(response)
		}).catch(err => reject(err))
	})
}

export const getMusicContent = (chapter) => {
	const url = `https://ejg5si0mi4.execute-api.us-west-2.amazonaws.com/dev/music/${chapter}`
	const config = {
	
	}
	return new Promise((resolve, reject) => {
		axios.get(url, config).then(res => {
			resolve(res.data)
		}).catch(err => reject(err))
	})
}

export const getDocumentContent = () => {
	const url = `https://ejg5si0mi4.execute-api.us-west-2.amazonaws.com/dev/document`
	const config = {}
	return new Promise((resolve, reject) => {
		axios.get(url, config).then(res => {
			resolve(res.data)
		}).catch(err => reject(err))
	})
}

export const getNarrationContent = () => {
	const url = `https://ejg5si0mi4.execute-api.us-west-2.amazonaws.com/dev/narration`
	const config = {}
	return new Promise((resolve, reject) => {
		axios.get(url, config).then(res => {
			resolve(res.data)
		}).catch(err => reject(err))
	})
}

export const getAnimationContent = () => {
	const url = `https://ejg5si0mi4.execute-api.us-west-2.amazonaws.com/dev/animation`
	const config = {}
	return new Promise((resolve, reject) => {
		axios.get(url, config).then(res => {
			resolve(res.data)
		}).catch(err => reject(err))
	})
}
