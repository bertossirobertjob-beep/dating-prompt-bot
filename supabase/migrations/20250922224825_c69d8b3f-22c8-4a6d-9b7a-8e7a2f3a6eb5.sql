-- Fix storage policies for chat-images bucket
-- First, drop existing policies
DROP POLICY IF EXISTS "Users can view their own chat images" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own chat images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own chat images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own chat images" ON storage.objects;

-- Create correct storage policies for chat-images bucket
CREATE POLICY "Users can view their own chat images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'chat-images' AND (auth.uid()::text = (storage.foldername(name))[1] OR auth.role() = 'service_role'));

CREATE POLICY "Users can upload their own chat images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'chat-images' AND (auth.uid()::text = (storage.foldername(name))[1] OR name !~ '/'));

CREATE POLICY "Users can update their own chat images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'chat-images' AND (auth.uid()::text = (storage.foldername(name))[1] OR auth.role() = 'service_role'));

CREATE POLICY "Users can delete their own chat images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'chat-images' AND (auth.uid()::text = (storage.foldername(name))[1] OR auth.role() = 'service_role'));