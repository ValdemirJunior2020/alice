from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, storage, firestore, auth
import os

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'medium-3ae06.appspot.com'
})
db = firestore.client()
bucket = storage.bucket()

@app.route("/api/lacos", methods=["GET"])
def get_lacos():
    docs = db.collection("lacos").stream()
    return jsonify([{**doc.to_dict(), "id": doc.id} for doc in docs])

@app.route("/api/lacos", methods=["POST"])
def add_laco():
    data = request.json
    db.collection("lacos").add(data)
    return jsonify({"msg": "Laco adicionado com sucesso!"}), 201

@app.route("/api/lacos/<id>", methods=["PUT"])
def update_laco(id):
    data = request.json
    db.collection("lacos").document(id).update(data)
    return jsonify({"msg": "Laco atualizado!"})

@app.route("/api/lacos/<id>", methods=["DELETE"])
def delete_laco(id):
    db.collection("lacos").document(id).delete()
    return jsonify({"msg": "Laco deletado!"})

if __name__ == "__main__":
    app.run(debug=True)
