-- Rendi il bucket chat-images pubblico per visualizzare le anteprime
UPDATE storage.buckets 
SET public = true 
WHERE id = 'chat-images';