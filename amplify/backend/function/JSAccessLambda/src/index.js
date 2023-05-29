import { CognitoJwtVerifier } from "aws-jwt-verify";

// Verifier that expects valid access tokens:
const verifier = CognitoJwtVerifier.create({
    userPoolId: "eu-central-1_QOoTXKgsC",
    tokenUse: "access",
    clientId: "2prlik4col60q0a57p1r3t8jse",
});

try {
    const payload = await verifier.verify(
        "eyJraWQeyJhdF9oYXNoIjoidk..." // the JWT as string
    );
    console.log("Token is valid. Payload:", payload);
} catch {
    console.log("Token not valid!");
}